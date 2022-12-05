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
	cardioChange_t cChange;
	poolChange_t pChange;
	weightChange_t wChange;
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

	attach = name_attach(NULL, SERVER_NAME, 0);
	chid = attach->chid;

	//Information to store
	char buffer[MAX_STRING_LEN+1];
	char* area;
	char* lift;
	int temp;
	int tempP;
	int mid;
	int bpm;
	int weight;

	//Receive messages from clients and send messages to web server
	while(1){
		rcvid = MsgReceive(chid, &msg, sizeof(msg), NULL);
		if(rcvid == 0){
			//received a pulse
			switch (msg.pulse.code) {
			case _PULSE_CODE_DISCONNECT:
				printf("Received disconnect pulse\n");
				if (-1 == ConnectDetach(msg.pulse.scoid)) {
					perror("ConnectDetach");
				}
				break;
			case _PULSE_CODE_UNBLOCK:
				printf("Received unblock pulse\n");
				if (-1 == MsgError(msg.pulse.value.sival_int, -1)) {
					perror("MsgError");
				}
				break;

			default:
				printf("unknown pulse received, code = %d\n", msg.pulse.code);

			}
		} else {
			switch(msg.type){
			case SAUNA_TYPE:
				temp = msg.sChange.temp;
				printf("Sauna temperature changed to: %d degrees\n", temp);

				//Write temperature to file in JSON format
				sprintf(buffer, "{\"type\":\"sauna\", \"temp\":%d}\n", temp);
				reply = fprintf(fd, "%s", buffer);
				fflush(fd);
				MsgReply(rcvid, 0, &reply, sizeof(reply));
				break;
			case POOL_TYPE:
				tempP = msg.pChange.temp;
				printf("Pool temperature changed to: %d degrees\n", tempP);

				//Write temperature to file in JSON format
				sprintf(buffer, "{\"type\":\"pool\", \"temp\":%d}\n", tempP);
				reply = fprintf(fd, "%s", buffer);
				fflush(fd);
				MsgReply(rcvid, 0, &reply, sizeof(reply));
				break;
				break;
			case EMERGENCY_TYPE:
				area = msg.eChange.area;
				printf("Emergency in area: %s\n", area);

				//Write emergency to file in JSON format
				sprintf(buffer, "{\"type\":\"emergency\", \"area\":\"%s\"}\n", area);
				reply = fprintf(fd, "%s", buffer);
				fflush(fd);
				MsgReply(rcvid, 0, &reply, sizeof(reply));
				break;
			case CARDIO_TYPE:
				mid = msg.cChange.machine_id;
				bpm = msg.cChange.heartrate;
				printf("High heartrate detected on cardio machine: %d. Rate was: %d bpm\n", mid, bpm);

				//Write to file in JSON format
				sprintf(buffer, "{\"type\":\"cardio\", \"id\":%d, \"bpm\":%d}\n", mid, bpm);
				reply = fprintf(fd, "%s", buffer);
				fflush(fd);
				MsgReply(rcvid, 0, &reply, sizeof(reply));
				break;
			case WEIGHT_TYPE:
				lift = msg.wChange.lift;
				weight = msg.wChange.weight;
				printf("Someone attempted to lift a large weight: %d type of lift: %s\n", weight, lift);

				//Write to file in JSON format
				sprintf(buffer, "{\"type\":\"weightroom\", \"weight\":%d, \"lift\":\"%s\"}\n", weight, lift);
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
