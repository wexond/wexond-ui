@echo Linking modules...

yarn unlink && yarn link && cd ./node_modules && cd react && yarn unlink && yarn link && cd ../react-dom && yarn unlink && yarn link && cd ../styled-components && yarn unlink && yarn link && cd ../@types/react && yarn unlink && yarn link && cd ../react-dom && yarn unlink && yarn link && cd ../styled-components && yarn unlink && yarn link
