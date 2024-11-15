---
title: "Create your own template for cyclops"
publishedAt: "2024-07-22"
summary: "Hello there, In this blog we are going to make a custom template for Cyclops. So, that we can easily..."
image: "https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fc3v1l8rzhtn6bl3nikuw.png"
slug: "create-your-own-template-for-cyclops-2acl"
---

Hello there,
In this blog we are going to make a custom template for [Cyclops](https://cyclops-ui.com). So, that we can easily is full power of cyclops.


## What is Cyclops?

Cyclops is an innovative web-based tool designed to simplify the management of distributed systems, specifically focusing on the widely used Kubernetes platform. By providing a user-friendly interface, Cyclops abstracts complex Kubernetes configuration files into intuitive web forms, making it easier for developers to deploy applications and manage Kubernetes environments. It offers predefined fields and graphical representations of deployments, enhancing visibility and reducing the learning curve associated with Kubernetes. Cyclops aims to empower IT operations teams, DevOps teams, developers and business owners, enabling them to streamline processes, increase productivity, and achieve cost savings in managing Kubernetes clusters. [(Read More)](https://cyclops-ui.com/docs/about)


## Now Let's install Cyclops locally to work with.

To run Cyclops locally we need following installed in our PC:
* [Docker](https://www.docker.com/)
* [Minikube](https://minikube.sigs.k8s.io/docs/)
* [Kubernetes](https://kubernetes.io/docs/tasks/tools/)
* [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) (for windows)

If you have installed setup the environment then let's dive in running Cyclops instance.

1. Start Docker Service as per your OS.

2. Start minikube. Run the command given below in your terminal (for windows open WSL).
~~~bash
minikube start
~~~

3. Install Cyclops cluster [(more info)](https://cyclops-ui.com/docs/installation/install/manifest).
~~~bash
kubectl apply -f https://raw.githubusercontent.com/cyclops-ui/cyclops/v0.8.2/install/cyclops-install.yaml && kubectl apply -f https://raw.githubusercontent.com/cyclops-ui/cyclops/v0.8.2/install/demo-templates.yaml

~~~
It will create a namespace callled `Cyclops` and deploy everything you need for your Cyclops instance to run.

4. Expose Cyclops Server outside the cluster.
~~~bash
kubectl port-forward svc/cyclops-ui 3000:3000 -n cyclops

~~~
Now you can open `http://localhost:3000` in your browser to access Cyclops Dashboard.


## How to Deploy servic
You can deploy any service by clicking to `Add module` button and selecting your desire service in just few clicks.

## How to create custom template

If you worked with [Helm](https://helm.sh/) you will have great time using Cyclops because Cyclops is a wrapper on top of Helm.
You can create your custom template just like you create a template of Helm only thing you had to do is creating `values.schema.json`. This file is important for cyclops to render UI related to configuration of the template.

## Let's create template
We are going to create a simple template for [MinIO](https://min.io/). MinIO is a high-performance, S3 compatible object store.

1. Create a folder to keep your files and create some files like this tree.
~~~
mino-io
│   Chart.yaml
│   values.schema.json
│   values.yaml
│
└───templates
        deployment.yaml
        pvc.yaml
        secret.yaml
        service.yaml
        _helpers.tpl
~~~
### Understand the structure
If you are from Helm background structure should be familiar to you. If not don't worry let's break it down.

#### Chart.yaml
This file will have the metadata like name, description and version of the template like
~~~yaml
apiVersion: v1
name: minio
version: 0.0.0
icon: https://min.io/resources/favs/apple-icon-180x180.png
description: A Helm chart for deploying MinIO, a high-performance object storage solution.

~~~
#### values.yaml
This file is very important because it contain the default values for a chart. These values may be overridden as Cyclops UI configuration changes.
For our template it looks like
~~~
replicas: 1

username: minioadmin
password: minioadmin

storage:
  size: 1Gi

service:
  port: 9000

resources:
  requests:
    cpu: 100m
    memory: 256Mi
  limits:
    cpu: 1000m
    memory: 2Gi

~~~
We have value of replicas default to 1.
default username and password, storage size, port and resources.

We can change these values from cyclops UI when we deploy the template.
For that we need to create a file values.schema.json

#### values.schema.json
This file is a necessary component in your templates. This file is usually used to impose a structure on the `values.yaml` file, but it is also crucial for rendering the GUI in Cyclops. The schema is represented as a [JSON Schema](https://json-schema.org/)
For our template it looks like this:
~~~json
{
    "properties": {
        "username": {
            "description": "User for MinIO (store in Kubernetes Secret)",
            "type": "string"
        },
        "password": {
            "description": "Pass key for MinIO (store in Kubernetes Secret)",
            "type": "string"
        },
        "replicas": {
            "description": "Number of MinIO server pods to deploy",
            "type": "integer"
        },
        "storage": {
            "title": "Storage",
            "type": "object",
            "properties": {
                "size": {
                    "description": "Size of storage allocated to each MinIO pod",
                    "type": "string",
                    "enum": [
                        "1Gi",
                        "2Gi",
                        "4Gi"
                    ]
                },
                "storageClass": {
                    "description": "Storage class for persistent storage (optional)",
                    "type": "string"
                }
            },
            "required": [
                "size"
            ]
        },
        "service": {
            "title": "Service",
            "type": "object",
            "properties": {
                "port": {
                    "description": "Port on which the MinIO service is exposed (default: 9000)",
                    "type": "integer"
                },
                "type": {
                    "description": "Service type (default: ClusterIP)",
                    "type": "string",
                    "enum": [
                        "ClusterIP",
                        "LoadBalancer",
                        "NodePort"
                    ]
                }
            }
        },
        "resources": {
            "title": "Resources",
            "type": "object",
            "properties": {
                "requests": {
                    "title": "Resource Requests",
                    "type": "object",
                    "properties": {
                        "cpu": {
                            "description": "Minimum CPU resources requested by MinIO",
                            "type": "string"
                        },
                        "memory": {
                            "description": "Minimum memory resources requested by MinIO",
                            "type": "string"
                        }
                    }
                },
                "limits": {
                    "title": "Resource Limits",
                    "type": "object",
                    "properties": {
                        "cpu": {
                            "description": "Maximum CPU resources allocated to MinIO",
                            "type": "string"
                        },
                        "memory": {
                            "description": "Maximum memory resources allocated to MinIO",
                            "type": "string"
                        }
                    }
                }
            }
        },
        "extraArgs": {
            "description": "Additional arguments to pass to the MinIO binary",
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "order": [
        "username",
        "password",
        "service",
        "replicas",
        "resources",
        "extraArgs"
    ],
    "required": [
        "username",
        "password",
        "replicas",
        "storage",
        "service",
        "resources"
    ],
    "title": "Values",
    "type": "object"
}

~~~
This file is self explanatory. We populated `properties` of type `object` and added required fields for [More info](https://cyclops-ui.com/docs/templates/).

Now Let's see inside `/templates` folder.

#### deployment.yaml
This YAML configuration defines a Kubernetes `Deployment` for a MinIO server using Helm templates. Let's break down each part of the configuration:

### apiVersion and kind
~~~yaml
apiVersion: apps/v1
kind: Deployment
~~~
- `apiVersion: apps/v1`: Specifies the API version used for the `Deployment` resource.
- `kind: Deployment`: Indicates that this configuration is for a `Deployment`.

### metadata
~~~yaml
metadata:
  name: {{ .Release.Name }}-minio
~~~
- `metadata`: Metadata about the `Deployment`.
- `name`: The name of the deployment is dynamically set using Helm templating, where `{{ .Release.Name }}` refers to the release name provided in the `Chart.yaml` file, appended with `-minio`.

### spec
~~~yaml
spec:
  replicas: {{ .Values.replicas | default 1 }}
  selector:
    matchLabels:
      app: minio
~~~
- `spec`: Specifies the desired state of the deployment.
- `replicas`: The number of pod replicas to run, which is dynamically set using file `values.yaml`, defaulting to 1 if not specified.
- `selector`: Defines how the deployment finds which pods to manage, using labels. Here, it matches pods labeled with `app: minio`.

### template
~~~yaml
  template:
    metadata:
      labels:
        app: minio
      annotations:
        checksum/config: {{ include (print $.Template.BasePath "/secret.yaml") . | sha256sum }}
    spec:
      containers:
      - name: minio
        image: quay.io/minio/minio:latest
        command:
        - /bin/bash
        - -c
        args: 
        - minio server /data --console-address :9090
        ports:
        - containerPort: 9000
        volumeMounts:
        - name: minio-data
          mountPath: /data
        env:
          - name: MINIO_ROOT_USER
            valueFrom:
              configMapKeyRef:
                name: {{ .Release.Name }}-minio-config
                key: MINIO_ROOT_USER
          - name: MINIO_ROOT_PASSWORD
            valueFrom:
              configMapKeyRef:
                name: {{ .Release.Name }}-minio-config
                key: MINIO_ROOT_PASSWORD
      volumes:
      - name: minio-data
        persistentVolumeClaim:
          claimName: {{ .Release.Name }}-minio-pvc
~~~
#### template.metadata
- `metadata`: Metadata for the pod template.
  - `labels`: Labels to identify the pods, here `app: minio`.
  - `annotations`: Additional information for the pod, using a checksum of the contents of `secret.yaml` to ensure that pods are redeployed when the secret changes.

#### template.spec
- `spec`: Specification for the pod.
  - `containers`: List of containers to run in the pod.
    - `name`: Name of the container, `minio`.
    - `image`: The container image to use, `quay.io/minio/minio:latest`.
    - `command` and `args`: Command and arguments to run inside the container. Here, it runs the MinIO server with the console accessible at port 9090.
    - `ports`: Container port exposed, `9000`.
    - `volumeMounts`: Mounts a volume to the container, with `minio-data` mounted at `/data`.
    - `env`: Environment variables for the container.
      - `MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD`: Set from a `ConfigMap` specified by `name: {{ .Release.Name }}-minio-config`.

#### template.spec.volumes
- `volumes`: Volumes to attach to the pod.
  - `name`: Name of the volume, `minio-data`.
  - `persistentVolumeClaim`: References a PVC (Persistent Volume Claim) to use for storage, with the claim name set dynamically using `{{ .Release.Name }}-minio-pvc`.


#### service.yaml
This file is used for creating a [service endpoint](https://kubernetes.io/docs/concepts/services-networking/service/) for your deployment.
For our template it is written as:
~~~yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-minio-service
spec:
  selector:
    app: minio
  ports:
  - protocol: TCP
    port: 80  # Adjust port if needed (external access)
    targetPort: 9000
  type: {{ .Values.service.type | default "ClusterIP" }}  # Adjust type for external access


~~~
The service targets pods labeled with app: minio, forwards traffic from port 80 (or any other specified port) to port 9000 on the pods, and defaults to a ClusterIP type unless overridden by the provided values.

### pvc.yaml
This file is used to create `PersistentVolumeClaim` (PVC) resource for the MinIO deployment, allowing it to request persistent storage. This file is optional for the template we are using because we need managed persistent storage. Let's break down each part of the configuration:

~~~yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: {{ .Release.Name }}-minio-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: {{ .Values.storage.size }}


~~~

This YAML configuration defines a Kubernetes `PersistentVolumeClaim` (PVC) resource for the MinIO deployment, allowing it to request persistent storage. Let's break down each part of the configuration:

- `apiVersion: v1`: Specifies the API version used for the `PersistentVolumeClaim` resource.
- `kind: PersistentVolumeClaim`: Indicates that this configuration is for a `PersistentVolumeClaim`.
- `metadata`: Metadata about the `PersistentVolumeClaim`.
- `name`: The name of the PVC is dynamically set using Helm templating, where `{{ .Release.Name }}` refers to the release name provided during the Helm chart installation, appended with `-minio-pvc`.
- `spec`: Specifies the desired state of the PVC.
- `accessModes`: Defines the access mode for the PVC.
  - `ReadWriteOnce`: The volume can be mounted as read-write by a single node. This is suitable for scenarios where the volume does not need to be shared across multiple nodes.
- `resources`: Specifies the resource requirements for the PVC.
  - `requests`: Requests specific resources for the PVC.
    - `storage`: The amount of storage requested for the PVC. This is dynamically set, where `{{ .Values.storage.size }}` refers to a value provided in `values.yaml`.


#### secret.yaml
This file will have the environment variables for secrets for service like API key, username, password. This file is very simple as:
~~~yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-minio-config
data:
  MINIO_ROOT_USER: {{ .Values.username | quote }}
  MINIO_ROOT_PASSWORD: {{ .Values.password | quote }}

~~~
Here inside `data` we created to variables for `MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD`. values will get from GUI or default values we put thin `values.yaml`.

At last We need a helper file to restart the service if these secrets change to reflect in deployment for that we will create `_helpers.tpl`

#### _helper.tpl
This file is completely optional for special condition like our template need to restart when values change. We need this file it includes:

~~~tpl
{{/*
Generate a checksum for the given configmap
*/}}
{{- define "configmap-checksum" -}}
{{- $sum := sha256sum (include (print $.Template.BasePath "/secret.yaml") .) -}}
{{- $sum -}}
{{- end -}}

~~~
It defines the function `configmap-checksum` inside that calculates the SHA-256 checksum of the content of a file named `secret.yaml`. The checksum is useful for tracking changes in the ConfigMap, allowing you to use it in annotations or labels to trigger pod redeployments when the ConfigMap content changes.

See in `deployment.yaml`

~~~yaml
  template:
    metadata:
      labels:
        app: minio
      annotations:
        checksum/config: {{ include (print $.Template.BasePath "/secret.yaml") . | sha256sum }}

~~~
In `annotations`. We are checking checksum/config for any changes if there is any change the it will restart the service automatically.

That's all we need to create a template we have successfully created our custom template. Check out [GitHub repository](https://github.com/priyanshuverma-dev/helm/tree/main/minIO) of same template.

Now let's deploy with Cyclops for that there are ways of storing template. Cyclops can access charts stored in three different ways:
1. GitHub Repository
2. Helm Chart Repository
3. OCI Repository

We are going to use GitHub Repository. Let's initialize our project with [git](https://git-scm.com/)

open terminal in your working directory where you stored your template
and run 
~~~bash
git init
~~~
It will initialize your folder with git then run
~~~bash
git add .
~~~
To add all the files then commit with any message
~~~bash
git commit -m "<any message>"
~~~
Then push the code to GitHub
~~~bash
git push origin main
~~~

Remember you need to add origin to your repository [More Info](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository)

## Add template in Cyclops
To add template in cyclops go to Cyclops dashboard in templates tab.


![Cyclops Templates Tab](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2pu6in89s0b3g4m8p94t.png)

click the Add template reference. A modal will appear asking you for a pointer to your template [Read More](https://cyclops-ui.com/docs/templates/template_storage).

Give Name to template in `Name`.
Put GitHub repository URL in `Repository URL`.
Enter the `Path` where files are in our case it is `/min-io`.
Enter the `Version` which  can be left empty / branch name / tag / commit hash.
Now Save, And goto `Modules` Tab and click on the Add module button in the top right corner. Under Module template you will find your custom template with the name with which you saved it.

This was about how to create a custom template for Cyclops and deploy it.

Thanks
Priyanshu Verma





 