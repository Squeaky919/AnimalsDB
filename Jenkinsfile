pipeline {
  agent any
  stages {
    stage('npm & docker') {
      steps {
        sh 'npm init && npm install express && npm install mongodb'
        sh 'docker-compose up'
      }
    }

    stage('test') {
      steps {
        sh 'newman run Animals.postman_collection.json'
      }
    }

    stage('') {
      steps {
        sh 'echo "Done!"'
      }
    }

  }
}