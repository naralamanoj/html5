#!/usr/bin/env python3
"""
Simple HTTP server for the portfolio website
"""
import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def guess_type(self, path):
        # Ensure proper MIME types
        mimetype, encoding = super().guess_type(path)
        if path.endswith('.js'):
            return 'application/javascript', encoding
        elif path.endswith('.css'):
            return 'text/css', encoding
        elif path.endswith('.svg'):
            return 'image/svg+xml', encoding
        return mimetype, encoding

def main():
    # Change to the directory containing this script
    os.chdir(Path(__file__).parent)
    
    PORT = 8000
    
    # Try to find an available port
    for port in range(PORT, PORT + 10):
        try:
            with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
                print(f"🚀 Portfolio website is running!")
                print(f"📍 Local URL: http://localhost:{port}")
                print(f"🌐 Network URL: http://127.0.0.1:{port}")
                print(f"📁 Serving files from: {os.getcwd()}")
                print(f"⏹️  Press Ctrl+C to stop the server")
                print("-" * 50)
                
                # Try to open the browser automatically
                try:
                    webbrowser.open(f'http://localhost:{port}')
                    print("🌐 Opening website in your default browser...")
                except:
                    print("💡 Manually open http://localhost:{port} in your browser")
                
                httpd.serve_forever()
        except OSError:
            continue
    
    print("❌ Could not find an available port. Please try again later.")
    sys.exit(1)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Thanks for viewing the portfolio!")
        sys.exit(0)