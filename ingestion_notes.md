### Some notes on ingesting datasets into Aperture
- [ ] Find either raw data or an API on the internet, interatively download the relevant data.
- [ ] Write a script in Jupyter Notebook to create a json file (or files, depending) with the data formatted appropriately, run this script
- [ ] log into Lattice-100, run $ mongoimport --port 27018 --type json -d sustaindb -c name_of_collection --file path_to_json --jsonArray
- [ ] createIndex -> db.<collection_name>.createIndex({field_you_want: 1})
- [ ] ./updateMetadata.sh <collection_name_in_mongo>
  - This script is located here: /s/parsons/b/others/sustain/dr101/turboingestor
- [ ] create metadata in menumetadata.json in aperture
