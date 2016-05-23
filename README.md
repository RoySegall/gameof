Installation:

  1. `$ docker build -t gameof .`.
  2. ```$ docker run -dit -v `pwd`:/usr/src/ -p 8080:80 --name=gameof-con gameof```.
  3. `$ docker exec -it gameof-con bash`.
