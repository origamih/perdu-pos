class TicketsController < ApplicationController
  before_action :set_ticket, only: [:show, :edit, :update, :destroy]

  # GET /tickets
  # GET /tickets.json
  def index
    @tickets = Ticket.all
  end

  # GET /tickets/1
  # GET /tickets/1.json
  def show
  end

  # POST
  def show_by_params
    @tickets = Ticket.where(ticket_params)
    respond_to do |format|
      format.json { render json: @tickets }
    end
  end

  # POST
  def show_by_date
    start_date = Date.parse(ticket_params[:start_date]).beginning_of_day
    end_date = Date.parse(ticket_params[:end_date]).end_of_day
    @tickets = Ticket.where(created_at: start_date..end_date).order(:created_at)
    render json: @tickets, include: :table
  end

  # GET /tickets/new
  def new
    @ticket = Ticket.new
  end

  # GET /tickets/1/edit
  def edit
  end

  # POST /tickets
  # POST /tickets.json
  def create
    @ticket = Ticket.new(ticket_params)
    respond_to do |format|
      if @ticket.save
        if @ticket.table_id
          Table.find(@ticket.table_id).update(status: Table.statuses[:occupied])
        end
        if @ticket.customer_id
          Customer.find(@ticket.customer_id).update(status: Customer.statuses[:occupied])
        end
        format.html { redirect_to @ticket, notice: 'Ticket was successfully created.' }
        format.json { render :show, status: :created, location: @ticket }
      else
        format.html { render :new }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tickets/1
  # PATCH/PUT /tickets/1.json
  def update
    respond_to do |format|
      if @ticket.update(ticket_params)
        format.html { redirect_to @ticket, notice: 'Ticket was successfully updated.' }
        format.json { render :show, status: :ok, location: @ticket }
      else
        format.html { render :edit }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tickets/1
  # DELETE /tickets/1.json
  def destroy
    @ticket.destroy
    respond_to do |format|
      format.html { redirect_to tickets_url, notice: 'Ticket was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ticket_params
      params.require(:ticket).permit(:note, :table_id, :customer_id, :created_at, :is_open, :start_date, :end_date)
    end
end
