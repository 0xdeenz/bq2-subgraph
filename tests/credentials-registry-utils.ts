import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { CredentialCreated } from "../generated/CredentialsRegistry/CredentialsRegistry"

export function createCredentialCreatedEvent(
    credentialId: BigInt,
    credentialType: BigInt,
    merkleTreeDepth: BigInt
): CredentialCreated {
    let credentialCreatedEvent = changetype<CredentialCreated>(newMockEvent())

    credentialCreatedEvent.parameters = new Array()

    credentialCreatedEvent.parameters.push(
        new ethereum.EventParam(
        "credentialId",
        ethereum.Value.fromUnsignedBigInt(credentialId)
        )
    )
    credentialCreatedEvent.parameters.push(
        new ethereum.EventParam(
        "credentialType",
        ethereum.Value.fromUnsignedBigInt(credentialType)
        )
    )
    credentialCreatedEvent.parameters.push(
        new ethereum.EventParam(
        "merkleTreeDepth",
        ethereum.Value.fromUnsignedBigInt(merkleTreeDepth)
        )
    )

    return credentialCreatedEvent
}
