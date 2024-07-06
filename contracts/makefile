# Define the sub-crates
CRATES = articles communities io posts users

# Default target to build the whole workspace
all:
	cargo build

# Target to clean the whole workspace
clean:
	cargo clean

# Target to build each sub-crate individually
$(CRATES):
	cargo build -p $@

# Targets for individual crates
articles:
	cargo build -p articles

communities:
	cargo build -p communities

io:
	cargo build -p io

posts:
	cargo build -p posts

users:
	cargo build -p users

# Target to run tests for the whole workspace
test:
	cargo test

# Target to run tests for each sub-crate individually
test-articles:
	cargo test -p articles

test-communities:
	cargo test -p communities

test-io:
	cargo test -p io

test-posts:
	cargo test -p posts

test-users:
	cargo test -p users
