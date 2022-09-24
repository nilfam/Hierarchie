# Use an official Python runtime as a base image
FROM python:3.6 as hierarchie_app

MAINTAINER Yukio Fukuzawa

ENV PYTHONUNBUFFERED 1

ARG uid=1000

ARG http_proxy=''
ARG https_proxy=''
ENV http_proxy=''
ENV https_proxy=''
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8


# Make port 8000 available to the world outside this container
EXPOSE 8000

WORKDIR /code

COPY . .

ENTRYPOINT ["/bin/bash"]
CMD ["run_app.sh"]
