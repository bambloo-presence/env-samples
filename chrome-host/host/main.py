#!/bin/env python3

import struct
from sys			 import stdout, stdin, exit
from threading import Thread

def send(msg):
	stdout.buffer.write(struct.pack('I', len(msg)))
	stdout.write(msg)
	stdout.flush()

def read():
	while True:
		text_len_bytes = stdin.buffer.read(4)

		if len(text_len_bytes) == 0:
			send('Exiting')
			break

		text_len = struct.unpack('@I', text_len_bytes)[0]
		text = stdin.buffer.read(text_len).decode('utf-8')

		send(text)

if __name__ == '__main__':
	read_th = Thread(target=read)
	read_th.start()
	read_th.join()

	exit(0)
