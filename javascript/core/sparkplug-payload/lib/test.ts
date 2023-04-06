// npx ts-node src/foo.ts

const fs = require('fs');
const sparkplug = require('sparkplug-payload');
const sparkplugbpayload = sparkplug.get("spBv1.0");

// Read the JSON file
const json = fs.readFileSync('schema.json', 'utf8');
const schema = JSON.parse(json);

//const buffer = Payload.encode(schema).finish();
const buffer = sparkplugbpayload.encodePayload(schema);

// Write the buffer to a file
fs.writeFileSync('../../../../linux/experimental/clc/poc/schema.protobuf', buffer);

/**
 * 
 * protoc --proto_path=. --js_out=import_style=commonjs,binary:. spb.proto
 */

const fs = require('fs');
const protobuf = require('protobufjs');

// Define the protobuf message
const root = protobuf.Root.fromJSON({
  nested: {
    Person: {
      fields: {
        name: { type: 'string', id: 1 },
        age: { type: 'int32', id: 2 },
      },
    },
  },
});

// Read the binary data from the file
const buffer = fs.readFileSync('persons.protobuf');

// Parse the binary data into a protobuf message
const Person = root.lookupType('Person');
const personArray = Person.decode(buffer);

// Convert the protobuf message to JSON
const json = JSON.stringify(personArray.toJSON(), null, 2);

// Write the JSON object to a file
fs.writeFileSync('persons.json', json);


console.log("hello");