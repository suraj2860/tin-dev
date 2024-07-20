// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// server: {
	// 	port: 8000,
	// 	proxy: {
	// 		"/api": {
	// 			target: "https://tin-dev-production.up.railway.app",
	// 		},
	// 	},
	// },
	preview: {
		port: 5173,
		strictPort: true,
	   },
	   server: {
		port: 5173,
		strictPort: true,
		host: true,
		origin: "http://0.0.0.0:5173",
	   },
});
