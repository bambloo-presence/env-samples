#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Msg Msg;
struct Msg {
	unsigned len;
	char *text;
};

void send(char *msg) {
	unsigned len = strlen(msg);

	// send the four bytes of length information
	printf("%c%c%c%c",
			(char) (len       & 0xFF),
			(char) (len << 8  & 0xFF),
			(char) (len << 16 & 0xFF),
			(char) (len << 24 & 0xFF));

	// output the message
	printf("%s", msg);
}

Msg read() {
	unsigned len = 0;

	// read the first four bytes
	for (int i = 0; i < 4; i++) {
		unsigned ch = getchar();
		len |= ch << i * 8;
	}

	// read the message from the extension
	char *text = malloc(len + 1);
	text[len] = 0;

	for (int i = 0; i < len; i++)
		text[i] = getchar();

	return (Msg) { len, text };
}

int main() {
	Msg msg = read();

	send(msg.text);
	free(msg.text);

	return 0;
}
