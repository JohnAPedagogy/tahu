
const fs = require('fs');

import * as sparkplugbpayload from './sparkplugbpayload';

// Read the JSON file
const json = fs.readFileSync('lib/person.txt', 'utf8');
const schema = JSON.parse(json);

//const buffer = Payload.encode(schema).finish();
const buffer = sparkplugbpayload.encodePayload(schema);

// Write the buffer to a file
fs.writeFileSync('lib/person.protobuf', buffer);

/**
 * 
 * protoc --proto_path=. --js_out=import_style=commonjs,binary:. spb.proto
 */
