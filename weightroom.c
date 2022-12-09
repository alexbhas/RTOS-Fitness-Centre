#include <stdio.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/neutrino.h>
#include <sys/netmgr.h>
#include <sys/iofunc.h>
#include <sys/dispatch.h>
#include "server.h"

#define MAX_WEIGHT 500

char* updateWeight(int* weight);

int main(int argc, char **argv){

	int coid;
	int server_ok;

	//Connect to server
	coid = name_open(SERVER_NAME, 0);

	//Build the update struct
	weightChange_t change;
	change.type = WEIGHT_TYPE;

	//Init temperature
	srand(time(NULL));
	int weight;
	char* lift;

	while(1){

		//Check if someone has attempted to lift a weight that is above a certain threshold
		lift = updateWeight(&weight);
		if(!(lift == NULL)){
			strcpy(change.lift, lift);
			change.weight = weight;
			printf("Someone attempted to lift a large weight: %d type of lift: %s\n", weight, lift);
			MsgSend(coid, &change, sizeof(change), &server_ok, sizeof(server_ok));
		}

	}

	return 0;
}

//Generator function not needed since few variables are being tracked

//Update function
//Randomly cause an emergency to occur
//This function is meant to simulate a person triggering an emergency
char* updateWeight(int* weight){

	//Sleep for 10 seconds, arbitrary delay for someone to attempt a large lift
	sleep(10);

	int r = rand() % (600 - 200 + 1) + 200;

	if(r >= MAX_WEIGHT){
		*weight = r;
		int i = (rand() % 3);
		if(i == 0){
			return "bench press";
		} else if (i == 1){
			return "deadlift";
		} else if (i == 2){
			return "squat rack";
		}
	}

	return NULL;

}


