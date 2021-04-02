export default class Feature {
    static featurePattern = /(.+)::(.+)::(.+)/;

    static compose(collection, name, friendlyName) {
        return `${collection}::${name}::${friendlyName}`;
    }

    /** Extract just the collection from a full feature name.
     *  @param {string} fullName The full name of a feature (collection + name);
     *  @returns {string} Just the collection name
     */
    static getCollection(fullName) {
        return fullName.match(Feature.featurePattern)[1];
    }

    /** Extract just the feature name from a full feature name.
     *  (i.e. remove the collection name).
     *  @param {string} fullName The full name of a feature (collection + name);
     *  @returns {string} Just the feature name
     */
    static getName(fullName) {
        return fullName.match(Feature.featurePattern)[2];
    }

    /** Extract just the human-readable name from a full feature name.
     *  @param {string} fullName The full name of a feature (collection + name);
     *  @returns {string} Just the human-readable name
     */
    static getFriendlyName(fullName) {
        return fullName.match(Feature.featurePattern)[3];
    }
}