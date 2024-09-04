# Deploying to Production

## Prerequisites

- SSH-key

# How to generate SSH-key:

Open git bash and run the following commands:

**1. Generate SSH-key**

```bash
ssh-keygen
```

**2. Name the key "galacticpathfinder" and put it in the .ssh folder**

You should enter the following path:

```bash
/c/Users/your_username/.ssh/galacticpathfinder
```

Remember to change your_username to your actual username.

**3. Enter a passphrase**

**4. Go to the .ssh folder and check if the key was created:**

```bash
cd ~/.ssh
ls
```

**5. Retrieve the public key**

```bash
cat galacticpathfinder.pub
```

**6. Copy the public key and send it in Discord :D**

# How to add a new persons SSH-key to the server

**1. Connect to the server**

```bash
ssh -i "~/.ssh/galacticpathfinder" root@134.209.177.49
```

**2. Open the authorized_keys file in VIM**

```bash
vi ~/.ssh/authorized_keys
```

**3. Add the new persons public key to the end of the file**

**4. Save and exit VIM**

```bash
:wq
```

**5. Verify that the key was added**

```bash
cat ~/.ssh/authorized_keys
```

# Connecting to the server

In a git bash terminal, run the following commands:

**1. Connect to the server**

```bash
ssh -i "~/.ssh/galacticpathfinder" root@134.209.177.49
```

**2. Enter the passphrase connected to the public key that you made earlier**

**3. Change directory to the GalacticPathFinder folder**

```bash
cd GalacticPathFinder
```

**5. Pull the latest changes from GitHub**

```bash
git pull
```

**6. Restart the docker container (IMPORTANT: in detached mode (-d) so it keeps running even when you close the terminal)**

```bash // TODO: Docker stop is NOT CORRECT!
docker stop; docker compose up --build -d
```
