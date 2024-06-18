import asyncio
import websockets

async def websocket_handler(websocket, path):
	print(f'WebSocket connection established from {websocket.remote_address}')

	try:
		async for message in websocket:
			print(f'Received message from {websocket.remote_address}: {message}')
			await websocket.send(message)
			print(f'Echoed message to {websocket.remote_address}: {message}')

	except websockets.exceptions.ConnectionClosedOK:
		print(f'WebSocket connection closed by {websocket.remote_address}')

async def main():
	server = await websockets.serve(websocket_handler, 'localhost', 8765)
	print('WebSocket server started on ws://localhost:8765')

	await server.wait_closed()

if __name__ == '__main__':
	asyncio.run(main())
