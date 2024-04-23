#include <iostream>

#define HOBO 54
int add(int, int);
int main() {
	if (3 > HOBO) {
  	std::cout << "big" << "\n";
	} else {
		std::cout << "small" << "\n";
	}
  return 0;
}

int add(int a, int b) {
	return a + b;
}
