#include <fcntl.h>
#include <stdio.h>
#include <sys/mman.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <sys/neutrino.h>
#include <process.h>
#include <string.h>
#include <sys/iofunc.h>
#include <sys/dispatch.h>

#include "server.h"

typedef union{
	uint16_t type;
	struct _pulse pulse;
	saunaChange_t sChange;
	emergChange_t eChange;
	//one struct for each event that can occur?
	//like changein x, y, z and these structs would have different things if more than one thing can happen
	//like changedSauna --> temp, person enter/exit, variables like that
} recv_buf_t;

int main(void){

	//Client variables
	int chid;
	int rcvid;
	int reply;
	recv_buf_t msg;
	name_attach_t *attach;

	//File I/O
	FILE *fd;
	fd = fopen("fitness_info.txt", "a");
	//either multiple of these or 1 dpeending on if it glitches
	attach = name_attach(NULL, SERVER_NAME, 0);
	chid = attach->chid;

	//Information to store
	char buffer[MAX_STRING_LEN+1];
	char* area;
	int temp;

	//Receive messages from clients and send messages to web server
	while(1){
		rcvid = MsgReceive(chid, &msg, sizeof(msg), NULL);
		//Received a pulse
		if(rcvid == 0){

		} else {
			switch(msg.type){
			case SAUNA_TYPE:
				temp = msg.sChange.temp;
				printf("Sauna temperature changed to: %d degrees\n", temp);

				//Write temperature to file in JSON format
				sprintf(buffer, "{\"type\":sauna, \"temp\":%d}\n", temp);
				reply = fprintf(fd, "%s", buffer);
				fflush(fd);
				MsgReply(rcvid, 0, &reply, sizeof(reply));
				break;
			case EMERGENCY_TYPE:
				area = msg.eChange.area;
				printf("Emergency in area: %s\n", area);

				//Write emergency to file in JSON format
				sprintf(buffer, "{\"type\":emergency, \"area\":%s}\n", area);
				reply = fprintf(fd, "%s", buffer);
				fflush(fd);
				MsgReply(rcvid, 0, &reply, sizeof(reply));
				break;
			}


		}
	}

	//Cleanup
	fclose(fd);


	return 0;
}
