pipeline {
  agent any
  stages {
    stage('npm & docker') {
      steps {
        sh 'npm init -y && npm install express && npm install mongodb'
        sh 'docker-compose up'
      }
    }

    stage('test') {
      steps {
        sh 'newman run Animals.postman_collection.json'
      }
    }

    stage('error') {
      steps {
        sh 'echo "Done!"'
      }
    }

  }
}