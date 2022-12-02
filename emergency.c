#include <stdio.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/neutrino.h>
#include <sys/netmgr.h>
#include <sys/iofunc.h>
#include <sys/dispatch.h>
#include "server.h"

char* updateEmerg();

int main(int argc, char **argv){

	int coid;
	int server_ok;

	//Connect to server
	coid = name_open(SERVER_NAME, 0);

	//Build the update struct
	emergChange_t change;
	change.type = EMERGENCY_TYPE;

	//Init temperature
	srand(time(NULL));
	char* area;

	while(1){

		//Check if there is an emergency. If not, don't update the server
		//something wrong garbage data
		area = updateEmerg();
		if(!(area == NULL)){
			strcpy(change.area, area);
			printf("Emergency detected in area: %s\n", area);
			MsgSend(coid, &change, sizeof(change), &server_ok, sizeof(server_ok));
		}

	}

	return 0;
}

//Generator function not needed since only one variable is being tracked

//Update function
//Randomly cause an emergency to occur
//This function is meant to simulate a person triggering an emergency
char* updateEmerg(){

	//Sleep for 10 seconds, arbitrary delay for an emergency to occur
	sleep(10);

	//20% chance for an emergency to occur
	int r = (rand() % 5) + 1;
	if(r == 1){
		int i = (rand() % 4);
		if(i == 0){
			return "sauna";
		} else if (i == 1){
			return "weightroom";
		} else if (i == 2){
			return "cardio";
		} else if (i == 3){
			return "pool";
		}
	} else {
		return NULL;
	}

}


