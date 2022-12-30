export class TurnCycle {
  battle: any;
  onNewEvent;
  currentTeam;

  constructor({ battle, onNewEvent }: any) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.currentTeam = 'player'; // can be 'player' or 'enemy'
  }

  async init() {

    // This message immediately fires off when a battle first starts, ie. when the battle
    // class calls init() via this.turnCycle.init()
    await this.onNewEvent({
      type: 'textMessage',
      text: 'The battle is starting!',
    });

    // Start the first turn!
    this.turn();
  }

  async turn() {

    // Caster - this is a reference to whose turn it is
    const casterId = this.battle.activeCombatants[this.currentTeam];
    const caster = this.battle.combatants[casterId];
    const enemyId = this.battle.activeCombatants[caster.team === 'player' ? 'enemy' : 'player'];
    const enemy = this.battle.combatants[enemyId];

    const submission = await this.onNewEvent({
      type: 'submissionMenu', 
      caster,
      enemy,
    });

    const resultingEvents = submission.action.success;
    for (let i = 0; i < resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      }
      await this.onNewEvent(event);
    }

    // Change teams from 'player' to 'enemy' & vice-versa once all of the events have 
    // completed
    this.currentTeam = this.currentTeam === 'player' ? 'enemy' : 'player';
    this.turn();
  }
  
}