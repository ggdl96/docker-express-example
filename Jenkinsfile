pipeline {
    agent none
    stages { 
        stage('Example') {
            agent dockerfile
            steps {
                 filename 'Dockerfile'
                label 'DockerFileLabel'
            }
        }
    }
}
