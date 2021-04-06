Aperture's client

# Table of Contents
- [Documenation](https://github.com/Project-Sustain/aperture-client/wiki)
- [How to run](#how_to_run)
- [Project Structure](#project_structure)
- [How to Generate Documentation](#docs)


# How to run <a name="how_to_run"></a>
1. Clone the respository
2. Navigate to the "aperture-client" directory
3. Run `npm install`
4. Perform any clean-up or audit operations requested by NPM (not necessary, but good practice)
5. Run `npm install live-server`
6. The webserver can now be started with the `npm run serve` command - by default the server can be accessed at port 8080 of the localhost

# Project Structure <a name="project_structure"></a>
    index.html    # main page of the client
    index.js      # initizalization for the client
    /images       # where images for the client are stored
    /src          # where the source code is
        /css               # css
        /static            # code that isn't really a library, and depends on a bunch of external items existing to be run
        /third-party       # where third-party css lives  
        /js                # where javascript for the frames live
            /static            # js that other things dont depend on
            /grpc              # grpc related code, much of it auto-generated
            /library           # in-house library code, like query interfaces and such (this is where most of the code is)
                /charting      # all the charting code
            /model-managers    # rendering libraries for models
            /third-party       # for third party JS libraries
            /ui                # UI related code
        /json     # where json live
    /test         # where mocha test code lives

# How to Generate Documentation <a name="docs"></a>
Run the following command from the root directory: \
`./node_modules/documentation/bin/documentation.js build src/**/!(*_pb*|*.bundle*|*.proto*).js -f md --shallow`
