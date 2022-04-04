const core = require('@actions/core');
const github = require('@actions/github');
const path = require("path");

const os = require('os');
const fs = require('fs');
//var uuidV4 = require('uuid/v4');
//const { v4: uuidv4 } = require('uuid');

const main = async () => 
{
            try 
          {
                        /**
                         * We need to fetch all the inputs that were provided to our action
                         * and store them in variables for us to use.
                         **/
                        
                        const productpath = core.getInput('productpath',{required: true});
                        const projectdir = core.getInput('projectdir',{required: false});
                        const imshared = core.getInput('imshared',{required: false});
                        const workspace = core.getInput('workspace',{required: false});
                        const project  = core.getInput('project',{required: false});
                        const suite  = core.getInput('suite',{required: false});
                        const varfile = core.getInput('varfile',{required: false});
                        const swapdatasets = core.getInput('swapdatasets',{required: false});
                        const configfile  = core.getInput('configfile',{required: false});
                        const results  = core.getInput('results',{required: false});
                        const overwrite = core.getInput('overwrite',{required: false});
                        const exportstats = core.getInput('exportstats',{required: false});
                        const exportstatreportlist  = core.getInput('exportstatreportlist',{required: false});
                        const exportstatshtml  = core.getInput('exportstatshtml',{required: false});
                        const usercomments = core.getInput('usercomments',{required: false});
                        const protocolinput = core.getInput('protocolinput',{required: false});
                        const exportreport  = core.getInput('exportreport',{required: false});
                        const imports  = core.getInput('suite',{imports: false});
                        const exportstatsformat = core.getInput('exportstatsformat',{required: false});
                        const publish = core.getInput('publish',{required: false});
                        const publish_for  = core.getInput('publish_for',{required: false});
                        const publishreports  = core.getInput('publishreports',{required: false});
                          if(configfile != null)
                            {  
                              if (process.platform == 'linux')
                                  {
                                    script = 'cd ' + '"'+productpath+'/cmdline"' + '\n'
                                    + 'bash cmdline.sh'
                                    + ' -configfile ' + '"'+configfile+'"';
                                  }
                              if (process.platform == 'win32')
                                  {
                                    script = 'cd ' + '"'+productpath+'\\cmdline"' + '\n'
                                    + './cmdline.bat'
                                    + ' -configfile ' + '"'+configfile+'"';   
                                  }
                            }
                          else
                          {
                            if(workspace == null || project == null || suite == null || imshared == null)
                            {
                              core.setFailed("WorkSpace,Project & Suite are mandotory parameters");
                            }	
                            if (process.platform == 'linux') {
                              script = 'cd ' + '"'+productpath+'/cmdline"' + '\n'
                              + 'bash cmdline.sh'
                              + ' -workspace ' + '"'+workspace+'"'
                              + ' -project ' + '"'+project+'"'
                              + ' -eclipsehome ' + '"'+productpath+'"'
                              + ' -plugins ' + '"'+imshared+'/plugins"';
                            }
                            else
                              if (process.platform == 'win32') {
                                script = 'cd ' + '"'+productpath+'\\cmdline"' + '\n' 
                                  + './cmdline.bat'
                                  + ' -workspace ' + '"'+workspace+'"'
                                  + ' -project ' + '"'+project+'"'
                                  + ' -eclipsehome ' + '"'+productpath+'"'
                                  + ' -plugins ' + '"'+imshared+'\\plugins"';
                              }
                              if(suite.indexOf(".xml")!=-1)
                              {
                                script = script.concat(' -aftsuite '+'"'+ suite +'"')
                              }
                              else
                              {
                                script = script.concat(' -suite '+'"'+ suite +'"')
                              }
                              if(vmargs != null)
                              {
                              script = script.concat(' -vmargs '+'"'+ vmargs +'"')
                              }	
                              if(labels != null)
                              {
                                  script = script.concat(' -labels '+'"'+ labels +'"')
                              }
                              if(varfile != null)
                              {
                                  script = script.concat(' -varfile '+'"'+ varfile +'"')
                              }
                              if(swapdatasets != null)
                              {
                                  script = script.concat(' -swapdatasets '+'"'+ swapdatasets +'"')
                              }
                              if(results !=null) 
                              {
                                  script = script.concat(' -results '+'"'+ results +'"')
                              }	
                              if(overwrite !=null) 
                              {
                                  script = script.concat(' -overwrite '+'"'+ overwrite +'"')
                              }
                              if(exportstats !=null) 
                              {
                                  script = script.concat(' -exportstats '+'"'+ exportstats +'"')
                              }
                              if(exportstatreportlist !=null) 
                              {
                                  script = script.concat(' -exportstatreportlist '+'"'+ exportstatreportlist +'"')
                              }
                              if(exportstatshtml !=null) 
                              {
                                  script = script.concat(' -exportstatshtml '+'"'+ exportstatshtml +'"')
                              }
                              if(usercomments !=null) 
                              {
                                  script = script.concat(' -usercomments '+'"'+ usercomments +'"')
                              }
                              if(protocolinput !=null) 
                              {
                                  script = script.concat(' -protocolinput '+'"'+ protocolinput +'"')
                              }
                              if(exportreport !=null) 
                              {
                                  script = script.concat(' -exportReport '+'"'+ exportreport +'"')
                              }
                              if(imports !=null) 
                              {
                                  script = script.concat(' -import '+'"'+ imports +'"')
                              }
                              if(exportstatsformat !=null) 
                              {
                                  script = script.concat(' -exportstatsformat '+'"'+ exportstatsformat +'"')
                              }
                              if(publish !=null)
                              {
                                  script = script.concat(' -publish '+'"'+ publish +'"')
                              }
                              if(publish_for !=null) 
                              {
                                  script = script.concat(' -publish_for '+'"'+ publish_for +'"')
                              }
                              if(publishreports !=null) 
                              {
                                  script = script.concat(' -publishreports '+'"'+ publishreports +'"')
                              }
                        }
                      

                      let tempDir = os.tmpdir();
                      let filePath = path.join(tempDirectory, uuidV4() + '.ps1');
                        await fs.writeFileSync(
                                filePath,
                                script, 
                                { encoding: 'utf8' });
                        
                        console.log(script);
                        console.log('========================== Starting Command Output ===========================');
                        var spawn = require("child_process").spawn,child;
                        child = spawn("powershell.exe",[filePath]);
                        child.stdout.on("data",function(data){
                            console.log("Powershell Data: " + data);
                        });
                        child.stderr.on("data",function(data){
                            console.log("Powershell Errors: " + data);
                            core.setFailed(data);
                        });
                        child.on("exit",function(){
                            console.log("Powershell Script finished");
                        });
                        child.stdin.end();

                        var fResultFile = tmpdir + path.sep + "CommandLineLog.txt"; 
                        var fResultFile = tmpdir + path.sep + "CommandLineLog.txt"; 
                      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@log file location "+fResultFile);
                          if (fs.existsSync(fResultFile)) {
                            console.log("@@@@@@@@@@@@@@@@@@@@@@@ inside if");
                              var verdictRegex = /--VERDICT=(INCONCLUSIVE|ERROR|PASS|FAIL).*/
                              var serverRegex = /--PUBLISH_URL=(.*)/;
                              var reportRegex = /--REPORT=(.*)[|]--URL=(.*)/;
                              var reports = {};
                              var isVerdictSet = false;
                              var verdict;
                              var publishURL;
                              var reportSet = false;
                              
                              var data = fs.readFileSync(fResultFile, 'utf-8')
                                  .split('\n');
                              data.forEach(line => {
                                  if (!isVerdictSet && verdictRegex.test(line)) {
                                      var result = verdictRegex.exec(line);
                                      verdict = result[1];
                                      console.log("Test Result is: "+verdict);
                                      isVerdictSet = true;
                          if(verdict=='ERROR' || verdict=='FAIL')
                          {
                            core.setFailed("Test Result is: FAIL");
                          }
                                  }
                                  else if(publishURL==undefined && serverRegex.test(line)){
                                      var result = serverRegex.exec(line);
                                      publishURL = result[1];
                                  }
                                  else if(reportRegex.test(line)){
                                      var reps = reportRegex.exec(line);
                                      reports[reps[1]] = reps[2];
                                      reportSet = true;
                                  }
                              });

                              if(!isVerdictSet){
                                  console.log("Test Result is: FAIL");
                                  core.setFailed("Test Result is: FAIL");
                              }
                              if(publishURL!=undefined && reportSet){
                                  console.log("");
                                  console.log("Published Reports information:");
                                  for(var i in reports){
                                      console.log(i+" : "+url.resolve(publishURL, reports[i]));
                                  }
                              }
                          }
                          else {
                              console.log("Test Result is: FAIL");
                              core.setFailed("Test Result is: FAIL");
                          }
                      
                      console.log("");
                    }  
          
          catch (error)
           {
              core.setFailed(error.message);
           }
}


// Call the main function to run the action
main();
