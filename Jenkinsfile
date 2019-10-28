pipeline {
    agent any
    stages { 
        stage('Example') {
            steps {
                sh 'docker-compose build'
                echo 'done!'
            }
        }
    }
}
