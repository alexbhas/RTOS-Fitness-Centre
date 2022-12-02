#include <stdint.h>
#include <sys/iomsg.h>

#define SERVER_NAME "fitness_server"

#define MAX_STRING_LEN    256

#define SAUNA_TYPE (_IO_MAX+200)
#define CARDIO_TYPE (_IO_MAX+201)
#define EMERGENCY_TYPE (_IO_MAX+202)
#define WEIGHT_TYPE (_IO_MAX+203)

typedef struct saunaChange{
	uint16_t type;
	int temp;
} saunaChange_t;

typedef struct emergChange{
	uint16_t type;
	char area[MAX_STRING_LEN+1];
} emergChange_t;

typedef struct cardioChange{
	uint16_t type;
	int highRateDetected;
} cardioChange_t;
