#include <stdio.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/neutrino.h>
#include <sys/netmgr.h>
#include <sys/iofunc.h>
#include <sys/dispatch.h>
#include "server.h"

#define DEFAULT_TEMP 75 //Celsius

int updateTemp(int temp);


int main(int argc, char **argv){

	int coid;
	int server_ok;

	//Connect to server
	coid = name_open(SERVER_NAME, 0);

	//Build the update struct
	saunaChange_t change;
	change.type = SAUNA_TYPE;

	//Init temperature
	srand(time(NULL));
	int temp = DEFAULT_TEMP;
	int prevTemp = temp;

	while(1){
		printf("Current temperature in sauna: %d\n", temp);
		//Only update the server if the temperature changed
		if(!(prevTemp == temp)){
			change.temp = temp;
			MsgSend(coid, &change, sizeof(change), &server_ok, sizeof(server_ok));
		}

		//Check if the temperature is updating
		prevTemp = temp;
		temp = updateTemp(temp);

	}

	return 0;
}

//Generator function not needed since only one variable is being tracked

//Update function
//Randomly increase or decrease the temperature by 1*, or do nothing
//This function is meant to simulate a person changing the temperature
int updateTemp(int temp){
	//Sleep for 5 seconds, arbitrary delay for the temperature to change
	sleep(5);
	int r = (rand() % 3) + 1;
	if(r == 1){
		if(temp - 1 < 65){
			return temp;
		} else {
			return temp - 1;
		}
	} else if(r == 2) {
		if(temp + 1 > 85){
			return temp;
		} else {
			return temp + 1;
		}
	} else {
		return temp;
	}
}


