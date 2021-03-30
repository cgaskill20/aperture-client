# Structure <a name="project_structure"></a>
    *.html    # any frame will be a .html in this directory
    /css      # where css for the frames live
         /frame-specific    # css that is specific to a certain frame
         /third-party       # where third-party css lives  
    /js       # where javascript for the frames live
         /control           # js that affects the control of the frames, for instance, onclick listeners
         /frame-specific    # js that is specific to a certain frame
         /grpc              # grpc related code, much of it auto-generated
         /library           # in-house library code, like query interfaces and such (this is where most of the code is)
         /third-party       # for third party JS libraries
         /ui                # UI related code
    /json     # where json for the frames live
