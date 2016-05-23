FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl wget

# Install Node.js for npm modules.
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y nodejs

VOLUME ["/usr/src"]
# ENTRYPOINT ["/usr/src/start.sh"]

EXPOSE 80
