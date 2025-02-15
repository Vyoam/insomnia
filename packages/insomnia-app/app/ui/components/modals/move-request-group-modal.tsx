import React, { PureComponent } from 'react';
import { autoBindMethodsForReact } from 'class-autobind-decorator';
import { AUTOBIND_CFG } from '../../../common/constants';
import Modal, { ModalProps } from '../base/modal';
import ModalBody from '../base/modal-body';
import ModalHeader from '../base/modal-header';
import ModalFooter from '../base/modal-footer';
import type { RequestGroup } from '../../../models/request-group';
import type { Workspace } from '../../../models/workspace';
import * as models from '../../../models';
import HelpTooltip from '../help-tooltip';

interface Props extends ModalProps {
  workspaces: Array<Workspace>;
  activeWorkspace: Workspace;
}

interface State {
  requestGroup: RequestGroup | null;
  selectedWorkspaceId?: string;
}

@autoBindMethodsForReact(AUTOBIND_CFG)
class MoveRequestGroupModal extends PureComponent<Props, State> {
  modal: Modal | null = null;

  state: State = {
    requestGroup: null,
    selectedWorkspaceId: undefined,
  }

  _setModalRef(n: Modal) {
    this.modal = n;
  }

  async _handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const { requestGroup, selectedWorkspaceId } = this.state;

    if (!requestGroup || !selectedWorkspaceId) {
      return;
    }

    const workspace = await models.workspace.getById(selectedWorkspaceId);

    if (!workspace) {
      return;
    }

    // TODO: if there are gRPC requests in a request group
    //  we should also copy the protofiles to the destination workspace - INS-267
    await models.requestGroup.duplicate(requestGroup, {
      metaSortKey: -1e9,
      parentId: selectedWorkspaceId,
      name: requestGroup.name, // Because duplicating will add (Copy) suffix
    });
    await models.requestGroup.remove(requestGroup);
    this.hide();
  }

  _handleChangeSelectedWorkspace(e: React.SyntheticEvent<HTMLSelectElement>) {
    const selectedWorkspaceId = e.currentTarget.value;
    this.setState({
      selectedWorkspaceId,
    });
  }

  show(options: { requestGroup: RequestGroup }) {
    const { requestGroup } = options;
    this.setState({
      requestGroup,
    });
    this.modal && this.modal.show();
  }

  hide() {
    this.modal && this.modal.hide();
  }

  render() {
    const { workspaces, activeWorkspace } = this.props;
    const { selectedWorkspaceId } = this.state;
    return (
      <form onSubmit={this._handleSubmit}>
        <Modal ref={this._setModalRef} {...this.props}>
          <ModalHeader key="header">Move Folder to Workspace</ModalHeader>
          <ModalBody key="body" className="pad">
            <div className="form-control form-control--outlined">
              <label>
                New Workspace&nbsp;
                <HelpTooltip>Folder will be moved to the root of the new workspace</HelpTooltip>
                <select onChange={this._handleChangeSelectedWorkspace} value={selectedWorkspaceId}>
                  <option value="n/a">-- Select Workspace --</option>
                  {workspaces.map(w =>
                    w._id === activeWorkspace._id ? null : (
                      <option key={w._id} value={w._id}>
                        {w.name}
                      </option>
                    ),
                  )}
                </select>
              </label>
            </div>
          </ModalBody>
          <ModalFooter key="footer">
            <button type="submit" className="btn">
              Move
            </button>
          </ModalFooter>
        </Modal>
      </form>
    );
  }
}

export default MoveRequestGroupModal;
