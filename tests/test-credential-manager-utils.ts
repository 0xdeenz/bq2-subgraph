import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { 
    GradeMemberAdded, 
    CredentialsMemberAdded, 
    NoCredentialsMemberAdded
} from "../generated/TestCredentialManager/TestCredentialManager"

export function createCredentialsMemberAddedEvent(
    credentialId: BigInt,
    index: BigInt,
    identityCommitment: BigInt,
    credentialsTreeRoot: BigInt
): CredentialsMemberAdded {
    let credentialsMemberAddedEvent = changetype<CredentialsMemberAdded>(
        newMockEvent()
    )

    credentialsMemberAddedEvent.parameters = new Array()

    credentialsMemberAddedEvent.parameters.push(
        new ethereum.EventParam(
        "credentialId",
        ethereum.Value.fromUnsignedBigInt(credentialId)
        )
    )
    credentialsMemberAddedEvent.parameters.push(
        new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
    )
    credentialsMemberAddedEvent.parameters.push(
        new ethereum.EventParam(
        "identityCommitment",
        ethereum.Value.fromUnsignedBigInt(identityCommitment)
        )
    )
    credentialsMemberAddedEvent.parameters.push(
        new ethereum.EventParam(
        "credentialsTreeRoot",
        ethereum.Value.fromUnsignedBigInt(credentialsTreeRoot)
        )
    )

    return credentialsMemberAddedEvent
}

export function createGradeMemberAddedEvent(
    credentialId: BigInt,
    index: BigInt,
    gradeCommitment: BigInt,
    gradeTreeRoot: BigInt
): GradeMemberAdded {
    let gradeMemberAddedEvent = changetype<GradeMemberAdded>(newMockEvent())

    gradeMemberAddedEvent.parameters = new Array()

    gradeMemberAddedEvent.parameters.push(
        new ethereum.EventParam(
        "credentialId",
        ethereum.Value.fromUnsignedBigInt(credentialId)
        )
    )
    gradeMemberAddedEvent.parameters.push(
        new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
    )
    gradeMemberAddedEvent.parameters.push(
        new ethereum.EventParam(
        "gradeCommitment",
        ethereum.Value.fromUnsignedBigInt(gradeCommitment)
        )
    )
    gradeMemberAddedEvent.parameters.push(
        new ethereum.EventParam(
        "gradeTreeRoot",
        ethereum.Value.fromUnsignedBigInt(gradeTreeRoot)
        )
    )

    return gradeMemberAddedEvent
}

export function createNoCredentialsMemberAddedEvent(
    credentialId: BigInt,
    index: BigInt,
    identityCommitment: BigInt,
    noCredentialsTreeRoot: BigInt
): NoCredentialsMemberAdded {
    let noCredentialsMemberAddedEvent = changetype<NoCredentialsMemberAdded>(
        newMockEvent()
    )

    noCredentialsMemberAddedEvent.parameters = new Array()

    noCredentialsMemberAddedEvent.parameters.push(
        new ethereum.EventParam(
        "credentialId",
        ethereum.Value.fromUnsignedBigInt(credentialId)
        )
    )
    noCredentialsMemberAddedEvent.parameters.push(
        new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
    )
    noCredentialsMemberAddedEvent.parameters.push(
        new ethereum.EventParam(
        "identityCommitment",
        ethereum.Value.fromUnsignedBigInt(identityCommitment)
        )
    )
    noCredentialsMemberAddedEvent.parameters.push(
        new ethereum.EventParam(
        "noCredentialsTreeRoot",
        ethereum.Value.fromUnsignedBigInt(noCredentialsTreeRoot)
        )
    )

    return noCredentialsMemberAddedEvent
}
