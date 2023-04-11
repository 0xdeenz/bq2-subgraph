import { BigInt, log } from "@graphprotocol/graph-ts"
import { TEST_CREDENTIAL_TYPE } from "./constants"
import { Group, MerkleTree } from "../generated/schema"
import {
    CredentialCreated,
} from "../generated/CredentialsRegistry/CredentialsRegistry"

/**
 * Creates a new group.
 * @param event Ethereum event emitted when a group is created.
 */
export function createCredential(event: CredentialCreated): void {
    log.debug(`CredentialCreated event block: {}`, [event.block.number.toString()])

    if (event.params.credentialType.toString() === TEST_CREDENTIAL_TYPE) {
        log.debug("Credential created was of TestCredentialManager type", [])

        // Father forgive me
        const gradeGroup = new Group((3 * (parseInt(event.params.credentialId.toString()) - 1) + 1).toString())
        const credentialsGroup = new Group((3 * (parseInt(event.params.credentialId.toString()) - 1) + 2).toString())
        const noCredentialsGroup = new Group((3 * (parseInt(event.params.credentialId.toString()) - 1) + 3).toString())

        const gradeMerkleTree = new MerkleTree((3 * (parseInt(event.params.credentialId.toString()) - 1) + 1).toString())
        const credentialsMerkleTree = new MerkleTree((3 * (parseInt(event.params.credentialId.toString()) - 1) + 2).toString())
        const noCredentialsMerkleTree = new MerkleTree((3 * (parseInt(event.params.credentialId.toString()) - 1) + 3).toString())

        log.info("Creating group '{}': grade group", [gradeGroup.id])

        gradeMerkleTree.depth = event.params.merkleTreeDepth
        gradeMerkleTree.numberOfLeaves = 0
        gradeMerkleTree.group = gradeGroup.id

        gradeGroup.timestamp = event.block.timestamp
        gradeGroup.merkleTree = gradeMerkleTree.id

        gradeMerkleTree.save()
        gradeGroup.save()

        log.info("Group '{}' has been created", [gradeGroup.id])

        log.info("Creating group '{}': credentials group", [credentialsGroup.id])

        credentialsMerkleTree.depth = event.params.merkleTreeDepth
        credentialsMerkleTree.numberOfLeaves = 0
        credentialsMerkleTree.group = credentialsGroup.id

        credentialsGroup.timestamp = event.block.timestamp
        credentialsGroup.merkleTree = credentialsMerkleTree.id

        credentialsMerkleTree.save()
        credentialsGroup.save()

        log.info("Group '{}' has been created", [credentialsGroup.id])

        log.info("Creating group '{}': no-credentials group", [noCredentialsGroup.id])

        noCredentialsMerkleTree.depth = event.params.merkleTreeDepth
        noCredentialsMerkleTree.numberOfLeaves = 0
        noCredentialsMerkleTree.group = noCredentialsGroup.id

        noCredentialsGroup.timestamp = event.block.timestamp
        noCredentialsGroup.merkleTree = noCredentialsMerkleTree.id

        noCredentialsMerkleTree.save()
        noCredentialsGroup.save()

        log.info("Group '{}' has been created", [noCredentialsGroup.id])
    }
}
