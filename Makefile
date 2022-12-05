
#
#	Makefile for Fitness Centre Software
#

DEBUG = -g
CC = qcc
LD = qcc


TARGET = -Vgcc_ntox86_64
#TARGET = -Vgcc_ntox86
#TARGET = -Vgcc_ntoarmv7le
#TARGET = -Vgcc_ntoaarch64le


CFLAGS += $(DEBUG) $(TARGET) -Wall
LDFLAGS+= $(DEBUG) $(TARGET)
BINS = server sauna emergency cardio pool weightroom
all: $(BINS)

clean:
	rm -f *.o $(BINS);
#	cd solutions; make clean


server.o: server.c server.h
sauna.o: sauna.c server.h
emergency.o: emergency.c server.h
cardio.o: cardio.c server.h
pool.o: pool.c server.h
weightroom.o: weightroom.c server.h

