// npx ts-node src/foo.ts
/*
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
 * npx ts-node lib/test.ts
 * protoc --proto_path=. --js_out=import_style=commonjs,binary:. spb.proto
 */

const fs = require('fs');
import * as protobuf from 'protobufjs';

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
const buffer = fs.readFileSync('lib/persons.protobuf');

// Parse the binary data into a protobuf message
const Person = root.lookupType('Person');
const personArray = Person.decode(buffer);

// Convert the protobuf message to JSON
const json = JSON.stringify(personArray.toJSON(), null, 2);

// Write the JSON object to a file
//fs.writeFileSync('persons.json', json);


console.log(json);


/*
static int my_init_metric(org_eclipse_tahu_protobuf_Payload_Metric *metric,
			  const char *name,
			  bool has_alias,
			  uint64_t alias,
			  uint64_t datatype,
			  bool is_historical,
			  bool is_transient,
			  const void *value,
			  size_t size_of_value)
{
	uint64_t fake_datatype = datatype;
	size_t fake_size = size_of_value;
	const void *fake_value = value;
	int8_t fake_int8_value = 0;
	pb_bytes_array_t *array_value = NULL;
	int rc;

	if (value != NULL && 
	    (datatype == METRIC_DATA_TYPE_BYTES ||
	     (datatype >= 22 && datatype <= 34)))
	{
		array_value = malloc(PB_BYTES_ARRAY_T_ALLOCSIZE(size_of_value));
		if (array_value == NULL)
		{
			fprintf(stderr, "malloc failed in my_init_metric\n");
			return -1;
		}
		fake_datatype = METRIC_DATA_TYPE_INT8;
		fake_value = &fake_int8_value;
		fake_size = sizeof(fake_int8_value);
	}
	rc = init_metric(metric, name, has_alias, alias, fake_datatype,
			 is_historical, is_transient, fake_value, fake_size);
	if (rc == -1)
	{
		free(array_value);
		return rc;
	}
	if (fake_datatype != datatype)
	{
		array_value->size = size_of_value;
		memcpy(array_value->bytes, value, size_of_value);
		metric->datatype = datatype;
		metric->which_value =
		    org_eclipse_tahu_protobuf_Payload_Metric_bytes_value_tag;
		metric->value.bytes_value = array_value;
	}
	return 0;
}

static void dump_bytes(const void *d, size_t len)
{
	size_t addr;
	int width_addr;

	width_addr = snprintf(NULL, 0, "%zx", len);
	width_addr += width_addr & 1;
	for (addr = 0; addr < len; addr++)
	{
		if ((addr & 15) == 0)
		{
			fprintf(stderr, "%0*zx:", width_addr, addr);
		}
		fprintf(stderr, " %02hhx", ((unsigned char *)d)[addr]);
		if ((addr & 15) == 15 || addr + 1 == len)
		{
			fprintf(stderr, "\n");
		}
	}
}

int main(void)
{
	org_eclipse_tahu_protobuf_Payload payload;
	org_eclipse_tahu_protobuf_Payload_Metric metric1;
	float data[5] = { 1.0, 2.0, 3.0, 4.0, 5.0 };
	uint8_t *payload_pb;
	size_t payload_pb_len;
	ssize_t rc_len;
	int rc;

	reset_sparkplug_sequence();

	get_next_payload(&payload);
	rc = my_init_metric(&metric1, "Data", true, 100, 30, false, false,
			    data, sizeof data);
	if (rc == -1)
	{
		free_payload(&payload);
		exit(EXIT_FAILURE);
	}
	rc = add_metric_to_payload(&payload, &metric1);
	if (rc == -1)
	{
		free_payload(&payload);
		exit(EXIT_FAILURE);
	}
	fprintf(stderr, "Payload to be encoded:\n");
	print_payload(&payload);
	rc_len = encode_payload(NULL, 0, &payload);
	if (rc_len == -1)
	{
		free_payload(&payload);
		exit(EXIT_FAILURE);
	}
	payload_pb_len = rc_len;
	payload_pb = malloc(payload_pb_len);
	if (payload_pb == NULL)
	{
		fprintf(stderr, "failed to allocate protobuf for payload\n");
		free_payload(&payload);
		exit(EXIT_FAILURE);
	}
	rc_len = encode_payload(payload_pb, payload_pb_len, &payload);
	if (rc_len == -1)
	{
		free(payload_pb);
		free_payload(&payload);
		exit(EXIT_FAILURE);
	}
	payload_pb_len = rc_len;
	free_payload(&payload);
	fprintf(stderr, "Protobuf-encoded payload (length %zu):\n",
		payload_pb_len);
	dump_bytes(payload_pb, payload_pb_len);
	/* Decode the payload.
	memset(&payload, 0, sizeof(payload));
	rc = decode_payload(&payload, payload_pb, payload_pb_len);
	if (rc == -1)
	{
		fprintf(stderr, "failed to decode the protobuf payload\n");
		free(payload_pb);
		exit(EXIT_FAILURE);
	}
	free(payload_pb);
	fprintf(stderr, "Decoded payload:\n");
	print_payload(&payload);
	free_payload(&payload);
}
 */