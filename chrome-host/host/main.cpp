#include <stdio.h>
#include <string>

int main() {
	unsigned len = 0;

	// read the first four bytes
	for (int i = 0; i < 4; i++) {
		unsigned ch = getchar();
		len |= ch << i * 8;
	}

	// read the message from the extension
	std::string msg = "";

	for (int i = 0; i < len; i++)
		msg += getchar();

	// send the four bytes of length information
	printf("%c%c%c%c",
			(char) (len & 0xFF),
			(char) (len << 8 & 0xFF),
			(char) (len << 16 & 0xFF),
			(char) (len << 24 & 0xFF));

	// output the message
	printf("%s", msg.c_str());

	return 0;
}
