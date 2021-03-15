
/* Reports information about which features are available for graphing (have data)
 * or not (don't have data).
 */
class ValidFeatureManager {
    constructor(valids, onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
        this.update(valids);
    }

    /* @param {string} current The feature to start at (i.e. that "next" is relative to)
     * @param {Array<string>} barring An array of features that should be ignored
     * @returns {string} The next valid feature, if any in `barring` are ignored
     */
    getNextFeature(current, barring) {
        let currentIndex = this.validFeatures.indexOf(current);
        let oldIndex = currentIndex;
        while (true) {
            currentIndex = (currentIndex + 1) % this.validFeatures.length;

            let foundFeature = !barring.find(feature => { feature === this.validFeatures[currentIndex] });
            foundFeature = foundFeature || currentIndex === oldIndex;

            if (foundFeature) {
                break;
            }
        }
        return this.validFeatures[currentIndex];
    }

    getAnyFeature() {
        return this.validFeatures[0];
    }

    /* @param {number} count The number of features that we should at least have
     * @returns {boolean} True if there are `count` or more features, false otherwise
     */
    enoughFeaturesExist(count) {
        return this.validFeatures.length >= count;
    }

    /* Replace the list of valid features with a new one.
     * Calls the onChangeCallback with the new values, if it is defined.
     * @param {Array<string>} A list of new valid features to replace the current ones
     */
    update(newValids) {
        this.validFeatures = newValids;
        if (this.onChangeCallback) {
            this.onChangeCallback(newValids);
        }
    }
}
