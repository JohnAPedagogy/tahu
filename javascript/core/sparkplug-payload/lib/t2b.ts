
const fs = require('fs');

import * as protobuf from 'protobufjs';

// Read the JSON file
const json = fs.readFileSync('lib/person.txt', 'utf8');
const schema = JSON.parse(json);

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
const Person = root.lookupType('Person');

//const buffer = Payload.encode(schema).finish();
const buffer = Person.encode(schema).finish();

// Write the buffer to a file
fs.writeFileSync('lib/persons.protobuf', buffer);

/**
 * 
 * protoc --proto_path=. --js_out=import_style=commonjs,binary:. spb.proto
 */
