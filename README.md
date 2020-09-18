# Limb.Tips

This respoitory is designed for tracking all the changes, improvements and new additions to the Limb.Tips website. 

## Why?

As a aspiring Python Developer, I have found myself wanting to write one-off tools just for the challenge of writing them, or to learn a new package/technology. This leads to a lot of code cluttering up my hard-drives not doing a whole lot. As such, I have decided to write this website, with Python in the back-end (obvs), to display some of these learnings as useful tools to other people, and as a small blog which will allow me to share these new learnings, problems and solutions, and occasionally allow me to setup my soapbox and shout into the void!

At the current time, this site is wildly incomplete, and it is not being hosted anywhere yet. I plan on setting up some hosting in the near future, when I have added a few new tools, and completed the Blog backbone.

## What can it do?

Primarilly this site will host a variety of tools. Currently the following have been developed:

- DNS Query

More will be on the way!

## Installation Instructions

These instructions assume you are using a Linux Distribution which has been released in the past 2 years.

### Prerequisites

To install this program you must have the following:

- Python 3.6 or newer
- A MongoDB Instance Setup

## Installation

1. Clone this Repository and Enter It

```sh
git clone https://github.com/MattLimb/limbtips.git /opt/limbtips

cd /opt/limbtips
```

2. Setup Virtual Environment (`venv`) and Enter It

```sh
python3 -m venv env/
```

```sh
source env/bin/activate
```

__NOTE__: Please use whichever Virtual Environment you feel most comfortable with. This step is also skippable.

__NOTE__: The rest of this guide assumes you are using a Virtual Environment which maps the `python` command to your Python3 Virtual Environment instance.

3. Install Python Requirements

```sh
python -m pip install -r requirements.txt
```

4. Edit Config File:

Add your MongoDB configuration to the `limbtips/config/limbtips.yaml` like so:

```yaml
mongodb:
  host: <host_ip>
  port: <host_port>
```

5. Run `limb.tips`:

```sh
python -m limbtips
```

__NOTE__: If you have changed the location of the install, please ensure you are running this command from the folder with this `READEME.md` in it. 