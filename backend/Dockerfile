# Private job-application dashboard (PocketBase). Deployed as its own Zeabur service with Root Directory
# set to `backend`; the site itself stays a static export and never talks to it.
FROM alpine:3.20

ARG PB_VERSION=0.40.4
ARG TARGETARCH=amd64

RUN apk add --no-cache ca-certificates unzip
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip pocketbase -d /pb/ && rm /tmp/pb.zip

COPY pb_migrations /pb/pb_migrations
COPY entrypoint.sh /pb/entrypoint.sh
RUN chmod +x /pb/entrypoint.sh

# Data lives in /pb/pb_data: mount a Zeabur volume there, or every redeploy starts with an empty database.
EXPOSE 8080

ENTRYPOINT ["/pb/entrypoint.sh"]
