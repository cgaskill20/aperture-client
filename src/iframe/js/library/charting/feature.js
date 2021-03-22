
/** A simple data transfer object to store a feature name and its collection.
 *  Also contains some utility functions.
 */
class Feature {
    /** Build a Feature object.
     *  @param {string} collection The name of the collection
     *  @param {string} name The name of the feature
     *  @param {string} friendlyName A human-readable version of the feature name
     */
    constructor(collection, name, friendlyName) {
        this.collection = collection;
        this.name = name;
        this.friendlyName = friendlyName;
    }
    
    /** The full name of a feature includes the name of its collection and the
     *  feature's own name.
     *  For instance, the name of county SVI is "svi_county::RPL_THEMES".
     */
    getFullName() {
        return `${collection}/${name}`;
    }

    /** Extract just the collection from a full feature name.
     *  @param {string} fullName The full name of a feature (collection + name);
     *  @returns {string} Just the collection name
     */
    static getCollectionFromFullName(fullName) {
        return fullName.substring(0, fullName.indexOf('/'));
    }
    
    /** Extract just the feature name from a full feature name.
     *  (i.e. remove the collection name).
     *  @param {string} fullName The full name of a feature (collection + name);
     *  @returns {string} Just the feature name
     */
    static getFeatureNameFromFullName(fullName) {
        return fullName.substring(fullName.indexOf('/') + 1);
    }
}
