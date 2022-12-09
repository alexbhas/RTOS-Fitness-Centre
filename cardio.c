#include <stdio.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/neutrino.h>
#include <sys/netmgr.h>
#include <sys/iofunc.h>
#include <sys/dispatch.h>
#include "server.h"

void generateCardio(int machines[][2]);
void updateCardio(int machines[][2]);
void detectedRate(int machines[][2], int machine[]);

#define MACHINE_AMOUNT 15
#define MAX_HEART_RATE 120
#define MIN_HEART_RATE 50

int main(int argc, char **argv){

	int coid;
	int server_ok;

	//Connect to server
	coid = name_open(SERVER_NAME, 0);

	//Build the update struct
	cardioChange_t change;
	change.type = CARDIO_TYPE;

	//Init temperature
	srand(time(NULL));
	int machines[MACHINE_AMOUNT][2];
	int machine[2] = {-1, -1};

	generateCardio(machines);


	while(1){
		updateCardio(machines);
		detectedRate(machines, machine);
		if(!(machine[0] == -1)){
			change.machine_id = machine[0];
			change.heartrate = machine[1];
			printf("High heartrate detected on machine: %d. Rate was: %d bpm\n", machine[0], machine[1]);
			MsgSend(coid, &change, sizeof(change), &server_ok, sizeof(server_ok));

			machine[0] = -1;
			machine[1] = -1;
		}

	}

	return 0;
}

//Generate the machines and fill them with random heartrate data
void generateCardio(int machines[][2]){

	int r;
	for(int i = 0; i < MACHINE_AMOUNT; i++){
		r = rand() % (95 - 65 + 1) + 65;
		machines[i][0] = i+1;
		machines[i][1] = r;
	}

}

//Update function
//Randomly change the heartrates across all of the machines
//This function is meant to simulate someone reaching a dangerous heartrate during cardio
void updateCardio(int machines[][2]){

	//Sleep for 2 seconds, arbitrary delay to update heartrates
	sleep(2);
	int tmp;
	int r;
	for(int i = 0; i < MACHINE_AMOUNT; i++){
		r = (rand() % 3) + 1;
		if(r == 1){
			tmp = 5;
		} else if (r == 2){
			tmp = -5;
		} else if (r == 3){
			tmp = 0;
		}

		machines[i][1] = machines[i][1] + tmp;
	}

}

//Detects an abnormally high heartrate in the machines
void detectedRate(int machines[][2], int machine[]){

	int r;
	for(int i = 0; i < MACHINE_AMOUNT; i++){
		if(machines[i][1] >= MAX_HEART_RATE || machines[i][1] <= MIN_HEART_RATE){

			machine[0] = machines[i][0];
			machine[1] = machines[i][1];

			r = rand() % (95 - 65 + 1) + 65;
			machines[i][1] = r;

		}
	}

}


