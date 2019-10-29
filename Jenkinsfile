pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            label 'DockerFileLabel'
        }
    }
    stages { 
        stage('Example') {
            steps {
                echo 'DONE!'
            }
        }
    }
}
