#!/usr/bin/env lua
-- vim: ft=lua

local struct = require 'struct'

local function send(msg)
	io.stdout:write(struct.pack('I', #msg))
	io.stdout:write(msg)
	io.stdout:flush()
end

local function read()
	while true do
		local text_len_bytes = io.stdin:read(4)

		if not text_len_bytes then
			send("Fuck y'all I'mma exit\n")
			os.exit(0)
		end

		local text_len = struct.unpack('@I', text_len_bytes)
		local text = io.stdin:read(text_len)

		send(text)
	end
end

read()
