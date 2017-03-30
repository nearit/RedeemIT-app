/**
 * Created by alessandrocolleoni on 14/03/16.
 */
/**
 *
 * Utils class
 * used to make conversion from a jsonApi format to a simplier json format (to use in forms/list/...) and to convert
 * that simplier format to a jsonApi needed by the backend.
 *
 */
export default class JsonApiUtils {

  /**
   *
   * this function take a jsonApiModel in input and return a simple json model
   *
   * @param jsonApiModel
   * @param includedData (not necessary, only if server responds with included data)
   * @returns {{}}
   */
  static toJsonModel (jsonApiModel, { includedData } = {}) {
    let jsonModel = {}
    jsonModel.id = jsonApiModel.id
    jsonModel.type = jsonApiModel.type

    this.populateJsonAttributes(jsonModel, jsonApiModel)

    if (jsonApiModel.relationships) {
      jsonModel.relationships = this.populateJsonRelationships(jsonApiModel.relationships)
    }

    if (jsonApiModel.meta) {
      jsonModel.meta = this.populateJsonMeta(jsonApiModel.meta)
    }

    if (includedData) {
      let mapRelationships = {}
      jsonModel.included = {}
      jsonModel.included = this.populateInclude(jsonModel, jsonApiModel, includedData, mapRelationships)
    }

    return jsonModel
  }

  /**
   * This function take a jsonApiModel array in input and return a converted array of simple json models
   *
   * @param jsonApiModelArray
   * @param includedData (not necessary, only if server responds with included data)
   * @returns Object or Array
   */
  static toJsonArrayModel (jsonApiModelArray, { includedData, meta } = {}) {
    let modelArray = []

    for (let jsonApiModel of jsonApiModelArray) {
      modelArray.push(JsonApiUtils.toJsonModel(jsonApiModel, { includedData }))
    }

    if (meta) {
      let metaArrayObject = {}
      metaArrayObject.meta = this.populateJsonMeta(meta)
      metaArrayObject.array = modelArray

      return metaArrayObject
    }

    return modelArray
  }

  /**
   * this function take a model and a jsonApiModel in input and return the last one with form and attributes populated
   * @param jsonModel
   * @returns {*}
   */
  static toJsonApiModel (jsonModel) {
    let jsonApiModel = {
      data: {
        attributes: {}
      }
    }

    jsonApiModel.data.id = jsonModel.id
    jsonApiModel.data.type = jsonModel.type

    for (let key in jsonModel) {
      if (this.notAttributeType(key)) {
        continue
      }
      jsonApiModel.data.attributes[key] = jsonModel[key]
    }

    if (jsonModel.relationships) {
      jsonApiModel.data.relationships = {}

      for (let key in jsonModel.relationships) {
        jsonApiModel.data.relationships[key] = {
          data : jsonModel.relationships[key]
        }
      }
    }

    return jsonApiModel
  }

  /**
   * Insert attributes at jsonModel top level
   * @param jsonModel
   * @param jsonApiModel
   */
  static populateJsonAttributes (jsonModel, jsonApiModel) {
    for (let key in jsonApiModel.attributes) {
      jsonModel[key] = jsonApiModel.attributes[key]
    }
  }

  /**
   *
   * Copy json api relationship to a json model.
   * Will be inserted as a nested object into the parent model.
   *
   * @param relationships
   * @returns {{}}
   */
  static populateJsonRelationships (relationships) {
    let relationshipsObject = {}

    for (let key in relationships) {
      let data = relationships[key].data || null;
      if (!data) {
        continue;
      }
      if (Array.isArray(data)) {
        relationshipsObject[key] = [];

        for (let elem of data) {
          relationshipsObject[key].push(elem)
        }

      } else {
        let obj = {}
        let relationshipsData = data;

        for (let property of Object.keys(relationshipsData)) {
          obj[property] = relationshipsData[property];
        }

        relationshipsObject[key] = obj;
      }
    }

    return relationshipsObject
  }

  /**
   *
   * Copy json api meta to a json model.
   * Will be inserted as a nested object into the parent model.
   *
   * @param meta
   * @returns {{}}
   */
  static populateJsonMeta (meta) {
    let metaObject = {}

    for (let key in meta) {
      metaObject[key] = meta[key]
    }

    return metaObject
  }

  /**
   *
   * Method to convert a json api format "include" to a more readable json format.
   * This take cares also for nested relationships inside an include element.
   *
   * @param jsonModel
   * @param jsonApiModel
   * @param includedData
   * @returns {*}
   */
  static populateInclude (jsonModel, jsonApiModel, includedData, mapRelationships) {
    for (let key in jsonApiModel.relationships) {
      let relationshipData = jsonApiModel.relationships[key].data
      jsonModel.included[key] = {}

      if (relationshipData) {
        if (Array.isArray(relationshipData)) {
          let array = []
          for (let actualRelationship of relationshipData) {
            let itemConverted = {}
            let itemIncludedJson = includedData.find(candidateItem => candidateItem.id == actualRelationship.id)

            if (!itemIncludedJson) {
              continue
            }

            itemConverted.id = itemIncludedJson.id

            this.populateJsonAttributes(itemConverted, itemIncludedJson)

            if (itemIncludedJson.meta) {
              itemConverted.meta = this.populateJsonMeta(itemIncludedJson.meta)
            }

            if (itemIncludedJson.relationships && !mapRelationships[actualRelationship.id]) {
              mapRelationships[actualRelationship.id] = {
                id : actualRelationship.id
              }
              let recursiveInArray = this.populateInclude({ included: {} }, itemIncludedJson, includedData, mapRelationships)
              itemConverted.included = recursiveInArray
              itemConverted.relationships = this.populateJsonRelationships(itemIncludedJson.relationships)
              mapRelationships[actualRelationship.id].data = itemConverted;
            } else if (itemIncludedJson.relationships && mapRelationships[actualRelationship.id] && mapRelationships[actualRelationship.id].data) {
              itemConverted = mapRelationships[actualRelationship.id].data
            }

            array.push(itemConverted)
          }

          jsonModel.included[key] = array
        } else {
          if (key == 'parent') {
            jsonModel.included[key].id = relationshipData.id
          } else {
            let itemConverted = {}
            let itemIncludedJson = includedData.find(candidateItem => candidateItem.id == relationshipData.id)

            if (itemIncludedJson) {
              itemConverted.id = itemIncludedJson.id

              this.populateJsonAttributes(itemConverted, itemIncludedJson)

              if (itemIncludedJson.meta) {
                itemConverted.meta = this.populateJsonMeta(itemIncludedJson.meta)
              }

              if (itemIncludedJson.relationships && !mapRelationships[relationshipData.id]) {
                mapRelationships[relationshipData.id] = {
                  id : relationshipData.id
                }
                let recursive = this.populateInclude({ included: {} }, itemIncludedJson, includedData, mapRelationships)
                itemConverted.included = recursive
                itemConverted.relationships = this.populateJsonRelationships(itemIncludedJson.relationships)
                mapRelationships[relationshipData.id].data = itemConverted;
              } else if (itemIncludedJson.relationships && mapRelationships[relationshipData.id] && mapRelationships[relationshipData.id].data) {
                mapRelationships = mapRelationships[relationshipData.id].data;
              }

              jsonModel.included[key] = itemConverted
            }
          }
        }
      }
    }

    return jsonModel.included
  }

  /**
   *
   * create filter
   *
   * @param params
   * @returns {{}}
   */
  static createFilter (params) {
    let jsonApiQueryParams = {}

    if (params.sort) {
      jsonApiQueryParams['sort'] = params.sort
    }

    if (params.include) {
      jsonApiQueryParams['include'] = params.include
    }

    let filterParams = params.filter
    for (let key in filterParams) {
      if (filterParams[key] instanceof Object) {
        for (let subkey in filterParams[key]) {
          jsonApiQueryParams['filter[' + key + '][' + subkey + ']'] = filterParams[key][subkey]
        }
      } else {
        jsonApiQueryParams['filter[' + key + ']'] = filterParams[key]
      }
    }

    if (params.filterMultipleFields) {
      jsonApiQueryParams['filter'] = params.filterMultipleFields
    }

    let filterStartsWith = params.startsWith
    for (let key in filterStartsWith) {
      jsonApiQueryParams['filter[' + key + '][starts_with]'] = filterStartsWith[key]
    }

    let filterStarts = params.starts
    for (let key in filterStarts) {
      jsonApiQueryParams['filter[' + key + '][start]'] = filterStarts[key]
    }

    let filterEnds = params.ends
    for (let key in filterEnds) {
      jsonApiQueryParams['filter[' + key + '][end]'] = filterEnds[key]
    }

    let filterContains = params.contains
    for (let key in filterContains) {
      jsonApiQueryParams['filter[' + key + '][contains]'] = filterContains[key]
    }

    let pageParams = params.page
    for (let key in pageParams) {
      jsonApiQueryParams['page[' + key + ']'] = pageParams[key]
    }

    if (params.search) {
      jsonApiQueryParams['search'] = params.search
    }

    return jsonApiQueryParams
  }

  static notAttributeType (key) {
    if (key == 'relationships' || key == 'meta' || key == 'included' || key == 'id' || key == 'type') {
      return true
    }

    return false
  }

  /**
   *
   * @param object
   * @param key
   * @param data
   * @param type
   */
  static addRelationship (object, key, type, data) {
    if (!object.relationships) {
      object.relationships = {}
    }

    if (Array.isArray(data)) {
      if (data.length == 0) {
        return
      }

      object.relationships[key] = object.relationships[key] ? object.relationships[key] : [];

      for (let i = 0; i < data.length; i++) {
        let currValue = data[i]
        if (currValue == null || typeof currValue === 'undefined' || currValue == '') {
          continue
        }

        object.relationships[key].push({
          id: currValue,
          type
        })
      }
    } else {
      object.relationships[key] = {
          id: data,
          type
      }
    }
  }

  static removeRelationship (relationship, { id, key } = {}) {
    if (Array.isArray(relationship)) {
      let obj = relationship.find(candidate => candidate.id == id)
      relationship.splice(relationship.indexOf(obj), 1)
    } else {
      delete relationship[key]
    }
  }

}
