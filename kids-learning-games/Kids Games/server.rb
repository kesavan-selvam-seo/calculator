# server.rb
# Production & local development HTTP server for Kids Learning Games

require 'webrick'

$stdout.sync = true
$stderr.sync = true

port = (ENV['PORT'] || 3000).to_i
root = File.expand_path(File.dirname(__FILE__))

puts "🚀 Starting Kids Learning Games Server on port #{port}..."
puts "📁 Serving directory: #{root}"
puts "🌐 Open: http://localhost:#{port}/"

mime_types = WEBrick::HTTPUtils::DefaultMimeTypes
mime_types.store('js', 'application/javascript')
mime_types.store('mjs', 'application/javascript')
mime_types.store('css', 'text/css')
mime_types.store('json', 'application/json')
mime_types.store('svg', 'image/svg+xml')
mime_types.store('png', 'image/png')
mime_types.store('jpg', 'image/jpeg')
mime_types.store('jpeg', 'image/jpeg')
mime_types.store('ico', 'image/x-icon')
mime_types.store('xml', 'application/xml')

server = WEBrick::HTTPServer.new(
  BindAddress: '0.0.0.0',
  Port: port,
  DocumentRoot: root,
  MimeTypes: mime_types,
  Logger: WEBrick::Log.new($stderr, WEBrick::Log::INFO),
  AccessLog: [
    [$stderr, WEBrick::AccessLog::COMMON_LOG_FORMAT]
  ]
)

trap('INT') { server.shutdown }
trap('TERM') { server.shutdown }

server.mount_proc '/' do |req, res|
  clean_path = req.path.split('?').first
  file_path = File.join(root, clean_path)

  if File.file?(file_path)
    res.status = 200
    ext = File.extname(file_path).delete('.').downcase
    res['Content-Type'] = mime_types[ext] || 'application/octet-stream'
    res.body = File.binread(file_path)
  elsif clean_path.match?(/\.(js|css|png|jpg|jpeg|svg|ico|json|xml|txt)$/i)
    res.status = 404
    res['Content-Type'] = 'text/plain'
    res.body = "404 Not Found: #{clean_path}"
  else
    index_file = File.join(root, 'index.html')
    if File.file?(index_file)
      res.status = 200
      res['Content-Type'] = 'text/html; charset=utf-8'
      res.body = File.read(index_file)
    else
      res.status = 404
      res.body = "index.html not found"
    end
  end
end

server.start
