pipeline {
  agent any
  stages {
    stage('npm & docker') {
      steps {
        sh 'npm init -y && npm install express && npm install mongodb'
        sh 'docker-compose up -d'
      }
    }

    stage('test') {
      steps {
        sh 'newman run Animals.postman_collection.json'
      }
    }

    stage('shut down') {
      steps {
        sh 'docker-compose down'
      }
    }

    stage('finish') {
      steps {
        sh 'echo "Done!"'
      }
    }

  }
}