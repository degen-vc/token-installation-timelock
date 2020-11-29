Usage: openzeppelin|oz <command> [options]

where <command> is one of: accounts, add, balance, bump, call, check, compile, create, create2, deploy, freeze, init, link, publish, push, remove, send-tx, session, set-admin, transfer, unlink, unpack, upgrade, verify

Options:
  --version      output the version number
  -v, --verbose  verbose mode on: output errors stacktrace and detailed log.
  -s, --silent   silent mode: no output sent to stderr.
  -h, --help     output usage information

Commands:
  
   accounts                                             list the accounts of the selected network

   add [contractNames...]                               add contract to your project. Provide a list of whitespace-separated contract names

   balance [address]                                    query the balance of the specified account

   bump <version>                                       bump your project to a new <version>

   call                                                 call a method of the specified contract instance. Provide the [address], method to call and its arguments if needed

   check [contract]                                     checks your contracts for potential issues

   compile                                              compiles all contracts in the current project

   create [alias]                                       deploys a new upgradeable contract instance. Provide the <alias> you added your contract with, or <package>/<alias> to create a contract from a linked package.

   create2 [alias]                                      deploys a new upgradeable contract instance using CREATE2 at a predetermined address given a numeric <salt> and a <from> address. Provide the <alias> you added your contract with, or <package>/<alias> to create a contract from a linked package. A <signature> can be provided to derive the deployment address from a signer different to the <from> address. Warning: support for this feature is experimental.

   deploy [contract] [arguments...]                     deploy a contract instance

   freeze                                               freeze current release version of your published project

   init [project-name] [version]                        initialize your OpenZeppelin project. Provide a <project-name> and optionally an initial [version] name

   link [dependencies...]                               links project with a list of dependencies each located in its npm package

   publish                                              publishes your project to the selected network

   push                                                 deploys your project to the specified <network>

   remove [contracts...]                                removes one or more contracts from your project. Provide a list of whitespace-separated contract names.

   send-tx                                              send a transaction to the specified contract instance. Provide the [address], method to call and its arguments if needed

   session                                              by providing network options, commands like create, freeze, push, and update will use them unless overridden. Use --close to undo.

   set-admin [alias-or-address] [new-admin-address]     change upgradeability admin of a contract instance, all instances or proxy admin. Provide the [alias] or [package]/[alias] of the contract to change the ownership of all its instances, or its [address] to change a single one, or none to change all contract instances to a new admin. Note that if you transfer to an incorrect address, you may irreversibly lose control over upgrading your contract.

   transfer                                             send funds to a given address

   unlink [dependencies...]                             unlinks dependencies from the project. Provide a list of whitespace-separated dependency names

   unpack [kit]                                         download and install an OpenZeppelin Starter Kit to the current directory

   upgrade [alias-or-address]                           upgrade contract to a new logic. Provide the [alias] or [package]/[alias] you added your contract with, its [address], or use --all flag to upgrade all contracts in your project.

   verify [contract]                                    verify a contract's source with Etherscan or Etherchain