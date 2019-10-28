pipeline {
    agent none
    stages { 
        stage('Example') {
            agent {
                dockerfile {
                    filename 'Dockerfile'
                    label 'DockerFileLabel'
                }
            }
            steps {
                echo 'DONE!'
            }
        }
    }
}
